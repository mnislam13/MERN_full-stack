let evaluation = () => {
    console.log("Task evaluation has started.")
    // synchronous
    for (let i = 0; i < 30000; i++) {}
    
    // callback Hell with asynchronous
    setTimeout(() => {
        console.log("Now, it's your turn.")
        setTimeout(() => {
            console.log("Show your work.")
            setTimeout(() => {
                console.log("Your evaluation is completed.")
            }, 6000)
        }, 1000)
    }, 2000)
};

evaluation();