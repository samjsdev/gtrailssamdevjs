import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import util from 'util';

const execAsync = util.promisify(exec);

export const REQUIRED_TEMPLATE_IDS = ['template1', 'template2', 'template3', 'template4', 'template6', 'template10'] as const;

export function getGeneratedWebsiteRoot(slug: string): string {
  return path.join(process.cwd(), 'data', slug, 'website');
}

type BuildDeployResult =
  | { ok: true; buildPath: string }
  | { ok: false; message: string };

export async function hasGeneratedWebsiteOutput(slug: string): Promise<boolean> {
  const websiteRoot = getGeneratedWebsiteRoot(slug);

  for (const templateId of REQUIRED_TEMPLATE_IDS) {
    const templateIndexPath = path.join(websiteRoot, templateId, 'index.html');
    try {
      await fs.access(templateIndexPath);
    } catch {
      return false;
    }
  }

  return true;
}

/**
 * Exports a standalone Next.js project to build/[slug]/
 * that can be independently built with `cd build/[slug] && npm install && npm run build`
 * No database dependencies, all images downloaded locally.
 */
export async function exportStandaloneProject(slug: string, templateId: string): Promise<BuildDeployResult> {
  const env = {
    ...process.env,
    NODE_ENV: 'production',
  } as NodeJS.ProcessEnv;

  try {
    const { stdout, stderr } = await execAsync(
      `node scripts/export_standalone.js "${slug}" "${templateId}"`,
      {
        env,
        shell: '/bin/bash',
        maxBuffer: 20 * 1024 * 1024,
        cwd: process.cwd(),
      }
    );

    console.log(`[export_standalone] slug: ${slug}, template: ${templateId}`);
    console.log(stdout);
    if (stderr?.trim()) {
      console.warn(stderr);
    }

    const buildPath = path.join(process.cwd(), 'build', slug);
    return { ok: true, buildPath };
  } catch (error) {
    const err = error as Error & { stdout?: string; stderr?: string };
    if (err.stdout?.trim()) {
      console.error(err.stdout);
    }
    if (err.stderr?.trim()) {
      console.error(err.stderr);
    }

    return {
      ok: false,
      message: err.message || 'Unknown error while running export_standalone',
    };
  }
}

/**
 * @deprecated Use exportStandaloneProject instead.
 * Kept for backward compatibility.
 */
export async function runBuildDeploy(trigger: string): Promise<{ ok: true } | { ok: false; message: string }> {
  const env = {
    ...process.env,
    NODE_ENV: 'production',
  } as NodeJS.ProcessEnv;

  try {
    const { stdout, stderr } = await execAsync('npm run build:deploy', {
      env,
      shell: '/bin/bash',
      maxBuffer: 20 * 1024 * 1024,
    });

    console.log(`[build:deploy] Trigger: ${trigger}`);
    console.log(stdout);
    if (stderr?.trim()) {
      console.warn(stderr);
    }

    return { ok: true };
  } catch (error) {
    const err = error as Error & { stdout?: string; stderr?: string };
    if (err.stdout?.trim()) {
      console.error(err.stdout);
    }
    if (err.stderr?.trim()) {
      console.error(err.stderr);
    }

    return {
      ok: false,
      message: err.message || 'Unknown error while running build:deploy',
    };
  }
}