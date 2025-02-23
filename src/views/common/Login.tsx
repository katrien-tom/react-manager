import axios from "axios";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    axios.get('/api/login').then((res) => {
      console.log("success", res);
    }).catch((err) => {
      console.log("error", err);
    });
  }, []);
  return <div>login</div>;
}

