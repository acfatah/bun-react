#!/usr/bin/env bun

import type { Dirent } from 'node:fs'
import Bun from 'bun'
import process from 'node:process'
import { join } from 'pathe'
import { readDir } from './utils'

const TARGET_DIR = 'templates'
const formatRequested = Bun.argv.includes('--format')

type LintScript = 'lint' | 'lint:staged'
type FormatScript = 'format'
type PackageScript = LintScript | FormatScript

interface ScriptResult {
  exitCode: number
  timedOut: boolean
}

async function lintApp(dirent: Dirent, scriptName: LintScript): Promise<ScriptResult> {
  const path = join(dirent.parentPath, dirent.name)

  console.log(`Linting "${path}" using script "${scriptName}"`)

  const proc = Bun.spawn(['bun', 'run', scriptName], {
    cwd: path,
    stdout: 'inherit',
    stderr: 'inherit',
  })

  const timeoutMs = Number(process.env.LINT_TIMEOUT_MS ?? 10 * 60 * 1000)
  let timedOut = false
  const timer = setTimeout(() => {
    timedOut = true
    try {
      proc.kill()
    }
    catch {}
  }, timeoutMs)

  const exitCode = await proc.exited.finally(() => clearTimeout(timer))

  if (timedOut) {
    console.error(`Linting "${path}" timed out after ${timeoutMs}ms and was killed.`)

    return { exitCode, timedOut }
  }

  if (exitCode) {
    console.error(`Error linting "${path}" (exit ${exitCode}). See output above.`)
  }
  else {
    console.log(`"${path}" is OK.`)
  }

  return { exitCode, timedOut: false }
}

async function formatApp(dirent: Dirent, scriptName: FormatScript): Promise<ScriptResult> {
  const path = join(dirent.parentPath, dirent.name)

  console.log(`Running format script "${scriptName}" in "${path}" to fix lint issues.`)

  const proc = Bun.spawn(['bun', 'run', scriptName], {
    cwd: path,
    stdout: 'inherit',
    stderr: 'inherit',
  })

  const timeoutMs = Number(process.env.FORMAT_TIMEOUT_MS ?? process.env.LINT_TIMEOUT_MS ?? 10 * 60 * 1000)
  let timedOut = false
  const timer = setTimeout(() => {
    timedOut = true
    try {
      proc.kill()
    }
    catch {}
  }, timeoutMs)

  const exitCode = await proc.exited.finally(() => clearTimeout(timer))

  if (timedOut) {
    console.error(`Formatting "${path}" timed out after ${timeoutMs}ms and was killed.`)

    return { exitCode, timedOut }
  }

  if (exitCode) {
    console.error(`Format script "${scriptName}" in "${path}" exited with code ${exitCode}. See output above.`)
  }
  else {
    console.log(`Format completed for "${path}".`)
  }

  return { exitCode, timedOut: false }
}

async function getScriptNameIfExists<T extends PackageScript>(
  appPath: string,
  scriptName: T,
): Promise<T | null> {
  try {
    const pkgFile = Bun.file(join(appPath, 'package.json'))

    if (!(await pkgFile.exists()))
      return null

    const json = await pkgFile.json()
    const scripts = (json && json.scripts) || {}

    return scripts[scriptName] ? scriptName : null
  }
  catch {
    return null
  }
}

async function main() {
  // Determine which lint script to look for: default 'lint' or 'lint:staged' when --staged flag is present
  const stagedRequested = Bun.argv.includes('--staged')
  const desiredLintScript: LintScript = stagedRequested ? 'lint:staged' : 'lint'

  const dir = await readDir(TARGET_DIR, {
    withFileTypes: true,
  }) as Dirent[]

  for (const dirent of dir) {
    if (!dirent.isDirectory())
      continue

    if (dirent.name === '_')
      continue

    const appPath = join(dirent.parentPath, dirent.name)
    const lintScript = await getScriptNameIfExists(appPath, desiredLintScript)

    if (!lintScript) {
      console.log(`Skipping "${appPath}": no ${desiredLintScript} script in package.json`)

      continue
    }

    const lintResult = await lintApp(dirent, lintScript)

    if (!formatRequested || lintResult.timedOut || lintResult.exitCode === 0)
      continue

    const formatScript = await getScriptNameIfExists(appPath, 'format')

    if (!formatScript) {
      console.log(`Skipping format for "${appPath}": no format script in package.json`)

      continue
    }

    const formatResult = await formatApp(dirent, formatScript)

    if (!formatResult.timedOut && formatResult.exitCode === 0) {
      console.log(`Re-running lint after formatting "${appPath}"...`)
      await lintApp(dirent, lintScript)
    }
  }

  console.log('All lint checks completed.')
}

main()
