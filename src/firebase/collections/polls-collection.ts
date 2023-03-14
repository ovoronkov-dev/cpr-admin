import { collection, FirestoreDataConverter } from "firebase/firestore";
import { PollModel } from "~core/models";
import { firebaseDb } from "..";

const converter: FirestoreDataConverter<PollModel> = {
  toFirestore: (model) => model,
  fromFirestore: (snapshot) => snapshot.data() as PollModel,
};

export const pollsCollection = () =>
  collection(firebaseDb, "polls").withConverter(converter);
