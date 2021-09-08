const rnorm = (n=1,mu=0,sd=1) => {
    let res = new Array(n);
    for(let i=0 ; i < n ; i++) {
        const x1 = 1 - Math.random(); 
        const x2 = 1 - Math.random();
        if (0.5 - Math.random() > 0) {
            res[i] = Math.sqrt(-2 * Math.log(x1)) * Math.sin(2 * Math.PI * x2) * sd + mu; 
        } else {
            res[i] = Math.sqrt(-2 * Math.log(x1)) * Math.cos(2 * Math.PI * x2) * sd + mu; 
        }
    }
    if (n===1) {return(res[0]);}
    return(res)
};

const runif = (n=1,min=0,max=1) => {
    let res = new Array(n); 
    for(let i=0 ; i < n ; i++) {
        res[i] = min + (max - min) * Math.random(); 
    }
    if (n===1) {return(res[0]);}
    return(res); 
};