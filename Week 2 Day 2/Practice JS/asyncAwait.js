function func() {
    let flag;
    let demoPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(flag = 1), 1000)
    });

    let result = demoPromise;

    console.log(result);
}

func();


async function asyncFunc() {
    let flag;

    let demoPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(flag = 1), 1000)
    });

    let result = await demoPromise; // waits until the promise is resolved

    console.log(result);
}

asyncFunc();

