import type { GeneratorCallback, Tree } from '@nrwl/devkit';
import { addDependenciesToPackageJson, readJson } from '@nrwl/devkit';
import { checkAndCleanWithSemver } from '@nrwl/devkit/src/utils/semver';
import { gte } from 'semver';
import { rxjsVersion as defaultRxjsVersion } from '../../../utils/versions';
import { versions } from '../../utils/version-utils';

export function addNgRxToPackageJson(tree: Tree): GeneratorCallback {
  let rxjsVersion: string;
  try {
    rxjsVersion = checkAndCleanWithSemver(
      'rxjs',
      readJson(tree, 'package.json').dependencies['rxjs']
    );
  } catch {
    rxjsVersion = checkAndCleanWithSemver('rxjs', defaultRxjsVersion);
  }

  const jasmineMarblesVersion = gte(rxjsVersion, '7.0.0') ? '~0.9.1' : '~0.8.3';
  const ngrxVersion = versions(tree).ngrxVersion;

  return addDependenciesToPackageJson(
    tree,
    {
      '@ngrx/store': ngrxVersion,
      '@ngrx/effects': ngrxVersion,
      '@ngrx/entity': ngrxVersion,
      '@ngrx/router-store': ngrxVersion,
      '@ngrx/component-store': ngrxVersion,
    },
    {
      '@ngrx/schematics': ngrxVersion,
      '@ngrx/store-devtools': ngrxVersion,
      'jasmine-marbles': jasmineMarblesVersion,
    }
  );
}
