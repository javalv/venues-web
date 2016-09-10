/**
 * Created by lin on 16/9/6.
 */
//import {seats} from "data1.js";
import {Http} from './http.js';
export class DataService {

    constructor() {
        this.http = new Http();
    }

    getSeats() {
        return this.http.getJSON("http://localhost:8080/venues/getSeats?standId=1764");
    }

    getOutlineData() {
        return this.http.getJSON("http://localhost:8080/venues/getAreas");
    }

}