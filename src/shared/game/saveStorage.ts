import type { RootState } from '@/app/store';
import type { GameState } from './types';

const databaseName = 'elden-ring-munchkin';
const storeName = 'game-saves';
const saveKey = 'current-duel';
const saveVersion = 1;

export type SavedGameSnapshot = {
	version: typeof saveVersion;
	savedAt: number;
	game: GameState;
	ui: {
		handLimitTarget: 'eventReveal' | 'turnEnd';
		hintKind: string;
		treasureDrawsAvailable: number;
	};
	redux: Pick<RootState, 'inventory' | 'playerArena'>;
};

const openDatabase = () =>
	new Promise<IDBDatabase>((resolve, reject) => {
		const request = indexedDB.open(databaseName, 1);

		request.onupgradeneeded = () => {
			const database = request.result;
			if (!database.objectStoreNames.contains(storeName)) {
				database.createObjectStore(storeName);
			}
		};

		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);
	});

const runTransaction = async <T>(
	mode: IDBTransactionMode,
	handler: (store: IDBObjectStore) => IDBRequest<T>
) => {
	const database = await openDatabase();

	return new Promise<T>((resolve, reject) => {
		const transaction = database.transaction(storeName, mode);
		const store = transaction.objectStore(storeName);
		const request = handler(store);

		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);
		transaction.oncomplete = () => database.close();
		transaction.onerror = () => {
			database.close();
			reject(transaction.error);
		};
	});
};

export const saveGameSnapshot = (snapshot: Omit<SavedGameSnapshot, 'savedAt' | 'version'>) =>
	runTransaction('readwrite', (store) =>
		store.put(
			{
				...snapshot,
				savedAt: Date.now(),
				version: saveVersion,
			},
			saveKey
		)
	);

export const loadGameSnapshot = async () => {
	const snapshot = await runTransaction<SavedGameSnapshot | undefined>('readonly', (store) =>
		store.get(saveKey)
	);

	return snapshot?.version === saveVersion ? snapshot : null;
};

export const clearGameSnapshot = () =>
	runTransaction('readwrite', (store) => store.delete(saveKey));
