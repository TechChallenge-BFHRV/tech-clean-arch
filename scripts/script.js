import http from 'k6/http';
import { sleep } from 'k6';

//10 vus usuarios
//30 duration segundos de duração

export const options = {
  vus: 250,
  duration: '30s',
};

export default function () {
  http.get('http://localhost:3000/api/v1/item');
  sleep(1);
}
