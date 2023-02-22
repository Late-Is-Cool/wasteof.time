import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import Pocketbase from 'pocketbase';

export default new Pocketbase(PUBLIC_POCKETBASE_URL);
