/**
 * Created by lin on 16/9/6.
 */
//import {seats} from "data1.js";
import {Http} from './http.js';
export class DataService {

    constructor() {
        this.http = new Http();
    }

    getSeats(standId) {
        return this.http.getJSON(`http://localhost:8080/venues/getSeats?standId=${standId}`);
    }

    getOutlineData() {
        return this.http.getJSON("http://localhost:8080/venues/getAreas");
    }

}