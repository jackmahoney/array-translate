module.exports = {

    /**
     * Nudge a range of columns in a two dimensional array up or down
     * @param arr Array to nudge
     * @param x1 starting index
     * @param distance distance from starting index
     * @param factor signed integer number of shifts up or down
     * @returns {*}
     */
    translateColumns: function (arr, x1, distance, factor){

        if(!factor || !distance){
            return arr;
        }

        //ensure we don't go outside of array bounds
        if(x1 + distance > arr[0].length){
           distance = arr[0].length - x1;
        }

        //create distance number of arrays
        var columns = [];
        for (var i = 0; i < distance; i++) {
            columns.push([])
        }


        //iterate rows and pull out column values
        for (var i = 0; i < arr.length; i++) {
            var row = arr[i];
            for (var j = 0; j < distance; j++) {
                var colVal = row[x1 + j];
                columns[j].push(colVal);
            }
        }

        //now we have our columns lets translateArray them
        for (var i = 0; i < columns.length; i++) {
            var column = columns[i];
            columns[i] = this.translateArray(column, factor);
        }

        //now lets put the columns them back in place
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < distance; j++) {
                arr[i][x1 + j] = columns[j][i];
            }
        }

        return arr;
    },

    /**
     * Nudge a range of rows in a two dimensional array left or right
     * @param arr Array to nudge
     * @param y1 starting index
     * @param distance distance from starting index
     * @param factor signed integer number of shifts left or right
     * @returns {*}
     */
    translateRows: function (arr, y1, distance, factor){

        if(!factor || !distance){
            return arr;
        }

        //ensure we don't go outside of array bounds
        if(y1 + distance > arr.length){
            distance = arr.length - y1;
        }

        for (var i = y1; i < y1 + distance; i++) {
            arr[i] = this.translateArray(arr[i], factor);
        }

        return arr;

    },

    translateArray: function (arr, distance){
        if(!distance){
            return arr;
        }
        if(distance < 0){
            var x0 = 0;
            var x1 = Math.abs(distance) % arr.length;
            var sliceA = arr.slice(x0, x1);
            var sliceB = arr.slice(x1, arr.length);
            return [].concat(sliceB).concat(sliceA);
        }
        else{
            var x0 = arr.length - distance % arr.length;
            var x1 = arr.length;
            var sliceA = arr.slice(x0, x1);
            var sliceB = arr.slice(0, x0);
            return [].concat(sliceA).concat(sliceB);
        }
    }
};
