export const greetings = (): string => {
    const date = new Date();
    const hour = date.getHours();
    let greeting = '';
 
    if (hour >= 0 && hour < 12) {
       greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 15) {
       greeting = 'Good Afternoon';
    } else if (hour >= 15 && hour < 24) {
       greeting = 'Good Evening';
    }
 
    return greeting;
 };