const determineAB = (t_index, rands, pre=0, t=null, finish=false) => {
    /**
     * Returns which task (A or B) the trial is currenty in
     * 
     * @param  {number}  t_index trial_index of the previous trial indicated by jsPsych
     * @param  {array}   rands   array of random numbers to determine task type 
     * @param  {number}  pre     number of trials before the task actually began (e.g., instructions, practice screen)
     * @param  {boolean} finish  indicator of whether the function was called inside `on_finish`
     * @return {string}          task type "A" or "B"
     */
    if (t === null) t = determineTrial(t_index, pre, finish);
    var pos = determinePos(t_index, pre, t, finish); 
    if ((rands[t-1] < 0.5 && pos === 'ant') || (rands[t-1] >= 0.5 && pos === 'post')) {  // task A
        return 'A';
    } else {  // task B
        return 'B';
    }
};

const determineTrial = (t_index, pre=0, finish=false) => {
    /**
     * Returns the current trial number 
     * 
     * @param  {number}  t_index trial_index of the previous trial indicated by jsPsych
     * @param  {number}  pre     number of trials before the task actually began (e.g., instructions, practice screen)
     * @param  {boolean} finish  indicator of whether the function was called inside `on_finish`
     * @return {number}          current trial number within 1 to n
     */
    var tmp = finish ? 6 : 7; 
    return Math.floor((t_index - pre + tmp) / 7);
}

const determinePos = (t_index, pre=0, t=null, finish=false) => {  // その試行の前半か後半か(position)を判別
    /**
     * Determines the task's poisition (前後半) within the current trial
     * 
     * @param  {number}  t_index trial_index of the previous trial indicated by jsPsych
     * @param  {number}  pre     number of trials before the task actually began (e.g., instructions, practice screen)
     * @param  {boolean} finish  indicator of whether the function was called inside `on_finish`
     * @param  {number}  t       current trial number within 1 to n
     * @return {string}          task's position within the current trial ('anterior' or 'posterior')
     */
    var tmp = finish ? 3 : 4; 
    if (t === null) {
        t = determineTrial(t_index, pre, finish); 
    }    
    return (Math.floor((t_index - pre + tmp) / 3.5) / 2 === t) ? 'post' : 'ant'; 
}