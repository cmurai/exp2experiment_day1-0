const daw_rewards = (N, n_task, n_option, mu=0, sd=0.025, min=0.25, max=0.75) => {
    /**
     * Returns reward values for each option in Daw task
     * 
     * @param  {number} N         number of trials per task 
     * @param  {number} n_task    number of tasks 
     * @param  {number} n_option  max number of options per task 
     * @param  {number} mu        mean of ND for distribution of reward 
     * @param  {number} sd        std deviation of ND for distribution of reward
     * @param  {number} min       minimum possible reward probability
     * @param  {number} max       maximum possible reward probability
     * @return {array}            array of rewards (n_task x n_option x N)
     */
    var rewards = [];
    for (let i=0; i<n_task; i++) {
        var r_i = [];
        for (let j=0; j<n_option; j++) {
            var r_j = new Array(N); 
            var rands_j = rnorm(N,mu,sd); 
            r_j[0] = (j % 2 === 0) ? runif(1,min,max) : (1 - r_i[j-1][0]);
            for (let k=1; k<N; k++) {
                r_j[k] = r_j[k-1] + rands_j[k];
                r_j[k] = (r_j[k] > max) ? max : r_j[k];
                r_j[k] = (r_j[k] < min) ? min : r_j[k];
            }
            r_i.push(r_j);
        }
        rewards.push(r_i);
    }
    return rewards;
}

const kool_rewards = (N, n_task, n_option, mu=0, sd=2, min=1, max=9) => {
    /**
     * Returns reward values for each option in Kool task
     * 
     * @param  {number} N         number of trials per task
     * @param  {number} n_task    number of tasks 
     * @param  {number} n_option  max number of options per task 
     * @param  {number} mu        mean of ND for distribution of reward 
     * @param  {number} sd        std deviation of ND for distribution of reward
     * @param  {number} min       minimum possible reward value 
     * @param  {number} max       maximum possible reward value 
     * @return {array}            array of rewards (n_task x n_option x N)
     */
    var rewards = [];
    for (let i=0; i<n_task; i++) {
        var r_i = [];
        var r = 1 - Math.random();
        for (let j=0; j<n_option; j++) {
            var r_j = new Array(N);
            var rands_j = rnorm(N,mu,sd);
            // set initial value 
            if (n_option === 2) {
                r_j[0] = (r < 0.5) ? runif(1,min,5) : runif(1,5,max);
            } else if (n_option === 3) {
                if (r < 1/3) {
                    if (j % 3 === 0) r_j[0] = runif(1,min,4);
                    else r_j[0] = (j % 3 === 1) ? runif(1,4,7) : runif(1,7,max);
                } else if (r < 2/3) {
                    if (j % 3 === 0) r_j[0] = runif(1,4,7);
                    else r_j[0] = (j % 3 === 1) ? runif(1,min,4) : runif(1,7,max);
                } else {
                    if (j % 3 === 0) r_j[0] = runif(1,7,max);
                    else r_j[0] = (j % 3 === 1) ? runif(1,4,7) : runif(1,min,4);
                }
            }

            // determine reward for each trial
            for (let k=1; k<N; k++) {
                r_j[k] = r_j[k-1] + rands_j[k];
                r_j[k] = (r_j[k] > max) ? max : r_j[k];
                r_j[k] = (r_j[k] < min) ? min : r_j[k];
            }
            // convert to natural number
            r_j = (() => {let re = new Array(N); for (let k=0; k<N; k++) {re[k] = Math.floor(r_j[k]);} return re;})();
            r_i.push(r_j);
        }
        rewards.push(r_i);
    }
    return rewards; 
}