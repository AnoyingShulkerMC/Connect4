import { handleUpgrade } from "WSLibrary"
import generateUUID from "./uuid4.js"
class Session {
	/** @type {Map<string, WSClientConnection>} */
	sessions
}
/** 
 * @typedef {Object} PartyMember A member currently in a game
 * @property {number} id The ID of the member (uint)
 * @property {string} name The name of the member
 */
/** 
 * @typedef {Object} Board Represents a tetris board
 * @property {number} width width of the board
 * @property {number} length The length of the board
 * @property {Array<Array<TetrisBlock>>} tokens The blocks on the board.
 */
/**
 * @typedef {Object} PartySettings The settings of the party
 * @property {boolean} isPublic Whether the party is public.
 * @property {number} mode      Game Mode. 1 = Versus, 2 = Objective
 */