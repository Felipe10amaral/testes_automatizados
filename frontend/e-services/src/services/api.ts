import axios from 'axios';
import { IFeatcher } from '../pages/contract/IFeatcher';


export const api = axios.create({
  baseURL: 'http://localhost:3330'
});

