let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

class Node {
    constructor(data) {
        this.data = data;
        this.leftTree = null;
        this.rightTree = null;
    }
}

class Tree {
    constructor(array) {
        //make sure to sort and remove duplicates from the array
        this.array = this.removeDuplicates(mergeSort(array))
        this.root = this.buildTree(this.array)
    }

    buildTree(array) {
        
    }

    removeDuplicates(array) {
        return [...new Set(array)];
    }

    merge(leftHalf, rightHalf) {
        let final = []
        console.log(leftHalf)
    
        while (leftHalf.length > 0 && rightHalf.length > 0) {
            let arrayWithLowest = (leftHalf[0] > rightHalf[0]) ? rightHalf : leftHalf;
            let lowestCurrentNumber = arrayWithLowest.shift();
            final.push(lowestCurrentNumber);
        };
    
        // console.log(`This is ${final}`)
        return final.concat(leftHalf, rightHalf)
    }
    
    mergeSort(array) {
        if (array.length < 2) return array;
    
        let arrayMidpoint = Math.floor(array.length / 2);
        let leftHalf = this.mergeSort(array.slice(0, arrayMidpoint));
        let rightHalf = this.mergeSort(array.slice(arrayMidpoint));
        return this.merge(leftHalf, rightHalf)
    }
}