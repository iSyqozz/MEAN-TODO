import { Collection } from "mongodb";
import { TODO } from "../models";
export declare function getMongoClient(uri: string): Promise<Collection | null>;
export declare function getEntries(collection: Collection): Promise<TODO[]>;
export declare function addorUpdateEntry(entry: TODO, collection: Collection): Promise<void>;
export declare function deleteEntry(entry: TODO, collection: Collection): Promise<void>;
