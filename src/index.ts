import Log from './log';   
import {start} from "./server"

Log("INFO", "prestart");
start();
Log("INFO", "afterstart")

/*(async () => {
    const response = await axios.get('https://api.ipify.org');

    console.log(`My public IP address is: ${response.data}`);
})()*/