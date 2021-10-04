/* eslint-disable functional/no-class */
/* eslint-disable functional/no-return-void */

export abstract class BaseCommand {
	abstract redo: () => void;
	abstract undo: () => void;
}
