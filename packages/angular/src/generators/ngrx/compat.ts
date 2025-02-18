import { convertNxGenerator } from '@nrwl/devkit';
import { warnForSchematicUsage } from '../utils/warn-for-schematic-usage';
import { ngrxGenerator } from './ngrx';

export default warnForSchematicUsage(convertNxGenerator(ngrxGenerator));
