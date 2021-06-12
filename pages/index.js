import greenlet from 'greenlet';
import {useState, useEffect} from 'react';
import UpperCase from '../workers/uppercase.worker.js';

let uppercase;
if (typeof window === 'object') {
  uppercase = greenlet(UpperCase);
}

export default function Index() {
  const [result, setResult] = useState('loading...');
  useEffect(() => {
    let cancel = false;
    uppercase('foo').then((res) => {
      !cancel && setResult(res);
    });
    return () => {
      cancel = true;
    };
  });
  return <h1>{result}</h1>;
}
