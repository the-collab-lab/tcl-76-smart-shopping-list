import {
	arrayUnion,
	getDoc,
	setDoc,
	collection,
	doc,
	onSnapshot,
	updateDoc,
	increment,
	deleteDoc,
	arrayRemove,
	query,
	where,
	getDocs,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './config';
import { getFutureDate, getDaysBetweenDates } from '../utils/dates';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

/**
 * A custom hook that subscribes to the user's shopping lists in our Firestore
 * database and returns new data whenever the lists change.
 * @param {string | null} userId
 * @param {string | null} userEmail
 * @returns
 */
export function useShoppingLists(userId, userEmail) {
	// Start with an empty array for our data.
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		// If we don't have a userId or userEmail (the user isn't signed in),
		// we can't get the user's lists.
		if (!userId || !userEmail) return;

		// When we get a userEmail, we use it to subscribe to real-time updates
		const userDocRef = doc(db, 'users', userEmail);

		onSnapshot(userDocRef, (docSnap) => {
			if (docSnap.exists()) {
				const userData = docSnap.data();
				const sharedLists = userData.sharedLists || []; // Lists created by the user
				const sharedWithMeLists = userData.sharedWithMe || []; // Lists shared with the user

				const sharedListsData = sharedLists.map((listRef) => ({
					name: listRef.id,
					path: listRef.path,
					isShared: false, // These lists are created by the user
				}));

				const sharedWithMeData = sharedWithMeLists.map((listRef) => ({
					name: listRef.id,
					path: listRef.path,
					isShared: true, // These lists are shared with the user
				}));

				const newData = [...sharedListsData, ...sharedWithMeData];
				setData(newData);
			}
		});
	}, [userId, userEmail]);

	return data;
}

/**
 * A custom hook that subscribes to a shopping list in our Firestore database
 * and returns new data whenever the list changes.
 * @param {string | null} listPath
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function useShoppingListData(listPath) {
	// Start with an empty array for our data.
	/** @type {import('firebase/firestore').DocumentData[]} */
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		if (!listPath) return;

		// When we get a listPath, we use it to subscribe to real-time updates
		// from Firestore.
		return onSnapshot(collection(db, listPath, 'items'), (snapshot) => {
			// The snapshot is a real-time update. We iterate over the documents in it
			// to get the data.
			const nextData = snapshot.docs.map((docSnapshot) => {
				// Extract the document's data from the snapshot.
				const item = docSnapshot.data();

				// The document's id is not in the data,
				// but it is very useful, so we add it to the data ourselves.
				item.id = docSnapshot.id;

				return item;
			});

			// Update our React state with the new data.
			setData(nextData);
		});
	}, [listPath]);

	// Return the data so it can be used by our React components.
	return data;
}

/**
 * Add a new user to the users collection in Firestore.
 * @param {Object} user The user object from Firebase Auth.
 */
export async function addUserToDatabase(user) {
	// Check if the user already exists in the database.
	const userDoc = await getDoc(doc(db, 'users', user.email));
	// If the user already exists, we don't need to do anything.
	if (userDoc.exists()) {
		return;
	} else {
		// If the user doesn't exist, add them to the database.
		// We'll use the user's email as the document id
		// because it's more likely that the user will know their email
		// than their uid.
		await setDoc(doc(db, 'users', user.email), {
			email: user.email,
			name: user.displayName,
			uid: user.uid,
		});
	}
}

/**
 * Create a new list and add it to a user's lists in Firestore.
 * @param {string} userId The id of the user who owns the list.
 * @param {string} userEmail The email of the user who owns the list.
 * @param {string} listName The name of the new list.
 */
export async function createList(userId, userEmail, listName) {
	const listDocRef = doc(db, userId, listName);

	await setDoc(listDocRef, {
		owner: userId,
	});

	const userDocumentRef = doc(db, 'users', userEmail);

	updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocRef),
	});

	return listDocRef.path;
}

/**
 * Shares a list with another user.
 * @param {string} listPath The path to the list to share.
 * @param {string} recipientEmail The email of the user to share the list with.
 */

//for a user, is there a way to know which shopping list are the ones being shared with, not owning this list
// if shared list, only unfollow when deleted
// if owning this list, cascading deletion
export async function shareList(listPath, currentUserId, recipientEmail) {
	// Check if current user is owner.
	if (!listPath.includes(currentUserId)) {
		return {
			response: `You don't have access to the shopping list "${listPath.split('/').pop()}".`,
		};
	}

	// Get the document for the recipient user.
	const usersCollectionRef = collection(db, 'users');
	const recipientDoc = await getDoc(doc(usersCollectionRef, recipientEmail));
	// If the recipient user doesn't exist, we can't share the list.
	if (!recipientDoc.exists()) {
		return { response: `User with email "${recipientEmail}" does not exist.` };
	}
	// Add the list to the recipient user's sharedLists array.
	const listDocumentRef = doc(db, listPath);
	const userDocumentRef = doc(db, 'users', recipientEmail);
	await updateDoc(userDocumentRef, {
		sharedWithMe: arrayUnion(listDocumentRef),
	});

	const updatedRecipientDoc = await getDoc(userDocumentRef);
	const updatedSharedLists = updatedRecipientDoc.data().sharedWithMe || [];
	console.log('After update:', updatedSharedLists);

	return {
		response: `The shopping list "${listPath.split('/').pop()}" has been shared!`,
	};
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listPath The path of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listPath, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listPath, 'items');

	const itemDocRef = doc(listCollectionRef, itemName);
	return setDoc(itemDocRef, {
		dateCreated: new Date(),
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name: itemName,
		totalPurchases: 0,
	});
}

export async function updateItem(listPath, itemId, item) {
	const { totalPurchases, dateCreated, dateLastPurchased, dateNextPurchased } =
		item;

	if (!listPath || listPath.trim() === '') {
		console.error('Error: Invalid listPath');
		return;
	}
	const currentDate = new Date();
	const dateCreatedAsDate = dateCreated.toDate();
	const dateLastPurchasedAsDate = dateLastPurchased?.toDate();

	const dateCreatedOrDateLastPurchased =
		dateLastPurchasedAsDate || dateCreatedAsDate;

	const dateNextPurchasedAsDate = dateNextPurchased.toDate();
	const previousEstimate = getDaysBetweenDates(
		dateCreatedOrDateLastPurchased,
		dateNextPurchasedAsDate,
	);

	const daysSinceLastPurchased = getDaysBetweenDates(
		dateCreatedOrDateLastPurchased,
		currentDate,
	);

	const daysUntilNextPurchase = calculateEstimate(
		previousEstimate,
		daysSinceLastPurchased,
		totalPurchases,
	);

	const updateData = {
		dateLastPurchased: new Date(),
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		totalPurchases: increment(1),
	};

	const updateItemListCollectionRef = collection(db, listPath, 'items');
	const updateItemListDocRef = doc(updateItemListCollectionRef, itemId);
	return updateDoc(updateItemListDocRef, updateData);
}

export async function deleteItem(listPath, item) {
	try {
		await deleteDoc(doc(db, listPath, 'items', item.name));
	} catch (error) {
		console.log(error);
	}
}

export async function deleteList(userEmail, listPath) {
	try {
		const listDocRef = doc(db, listPath);
		await deleteDoc(listDocRef);

		const userDocumentRef = doc(db, 'users', userEmail);
		await updateDoc(userDocumentRef, {
			sharedLists: arrayRemove(listDocRef),
		});

		const usersCollectionRef = collection(db, 'users');
		const q = query(
			usersCollectionRef,
			where('sharedWithMe', 'array-contains', listDocRef),
		);

		const usersWhoHasList = await getDocs(q);

		usersWhoHasList.forEach(async (docSnapshot) => {
			const userDocRef = doc(db, 'users', docSnapshot.id);
			await updateDoc(userDocRef, {
				sharedWithMe: arrayRemove(listDocRef),
			});
		});
	} catch (error) {
		console.error('Error deleting the list:', error);
	}
}

export async function unfollowList(userEmail, listPath) {
	try {
		const listDocRef = doc(db, listPath);

		// Remove the list reference from the user's sharedWithMe array
		const userDocumentRef = doc(db, 'users', userEmail);
		await updateDoc(userDocumentRef, {
			sharedWithMe: arrayRemove(listDocRef),
		});
	} catch (error) {
		console.error('Error unfollowing the list:', error);
	}
}

export function comparePurchaseUrgency(list) {
	const currentDate = new Date();
	const soon = [];
	const kindOfSoon = [];
	const notSoon = [];
	const inactive = [];
	const overdue = [];

	const sortedList = list.sort((a, b) => {
		const dateNextPurchasedAsDateA = a.dateNextPurchased?.toDate();
		const dateNextPurchasedAsDateB = b.dateNextPurchased?.toDate();

		const daysUntilNextPurchaseA = getDaysBetweenDates(
			currentDate,
			dateNextPurchasedAsDateA,
		);
		const daysUntilNextPurchaseB = getDaysBetweenDates(
			currentDate,
			dateNextPurchasedAsDateB,
		);

		return daysUntilNextPurchaseB > daysUntilNextPurchaseA ? -1 : 1;
	});

	sortedList.forEach((item) => {
		const dateNextPurchasedAsDate = item.dateNextPurchased?.toDate();

		const daysUntilNextPurchase = getDaysBetweenDates(
			currentDate,
			dateNextPurchasedAsDate,
		);
		if (daysUntilNextPurchase < 0) {
			overdue.push(item);
		} else if (daysUntilNextPurchase >= 0 && daysUntilNextPurchase <= 7) {
			soon.push(item);
		} else if (daysUntilNextPurchase > 7 && daysUntilNextPurchase < 30) {
			kindOfSoon.push(item);
		} else if (daysUntilNextPurchase >= 30 && daysUntilNextPurchase < 60) {
			notSoon.push(item);
		} else if (daysUntilNextPurchase >= 60) {
			inactive.push(item);
		}
	});

	return {
		overdue,
		soon,
		kindOfSoon,
		notSoon,
		inactive,
	};
}
