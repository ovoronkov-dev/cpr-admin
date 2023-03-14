import { doc, FirestoreDataConverter, getDoc } from "firebase/firestore";
import { PollModel } from "~core/models";
import { firebaseDb } from "..";

const converter: FirestoreDataConverter<PollModel> = {
  toFirestore: (model) => model,
  fromFirestore: (snapshot) => snapshot.data() as PollModel,
};

export const getPollDocument = (id: string) =>
  getDoc(doc(firebaseDb, "polls", id).withConverter(converter));
