/**
 * Created by lin on 16/9/6.
 */
//import {seats} from "data1.js";
import {Http} from './http.js';
export class DataService {

    constructor() {
        this.http = new Http();
        this.host = location.host;
        console.log(this.host);
    }

    getSeats(standId) {
        let host = this.host;
        return this.http.getJSON(`http://${host}/venues/getSeats?standId=${standId}`);
    }

    getOutlineData(){
        let host = this.host;
        return this.http.getJSON(`http://${host}/venues/getAreas`);
    }

}