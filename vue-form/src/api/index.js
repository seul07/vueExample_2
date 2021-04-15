import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
    const instance = axios.create();
    return instance;
}

// 액시오스 초기화 함수
function createInstanceWithAuth() {
    const instance = axios.create();
    return setInterceptors(instance);
}

export const instance = createInstance();
export const instanceWithAuth = createInstanceWithAuth();

// CREATE - posts
// POST - posts
// PUT - posts {id}
// DELETE - posts {id}