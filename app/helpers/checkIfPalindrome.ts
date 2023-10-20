export function checkIfPalindrome(str: string) {
    str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''); // Regular expression that removes all non-alphanumeric characters 
    const length = str.length;
    
    for (let i = 0, j = length - 1; i < j; i++, j--) { // Running one loop forwards, one backwards and checking if characters are the same
      if (str[i] !== str[j]) {
        return false;
      }
    }
    
    return true;
  }
  
  