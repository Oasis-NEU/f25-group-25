class User {
    constructor(owe, name, balance) {
        this.owe = owe;
        this.name = name;
        this.balance = balance;
        this.debts = {};
    }

    CreateDebt(userObject, amount) {
        /**
         * Positive amount means you owe this person money
         * Negative amount means they owe you
         */
        const current = this.debts[userObject.name]?.amount ?? 0;
        const newAmount = current + amount;
        this.debts[userObject.name] = {
            creditor: amount > 0 ? userObject.name : this.name,
            amount: newAmount
        };

        const otherCurrent = userObject.debts[this.name]?.amount ?? 0;
        const otherNewAmount = otherCurrent - amount; // opposite direction
        userObject.debts[this.name] = {
            creditor: amount < 0 ? userObject.name : this.name,
            amount: otherNewAmount
        };

        this.owe += amount
    }

    PayDebt(userObject, amount){
        if(userObject.name in this.debts){
            if(this.debts[userObject.name]['amount'] - amount >= 0){
                this.debts[userObject.name]['amount'] -= amount
                this.balance -= amount
                this.owe -= amount

            }
            else{
                this.debts[userObject.name]['amount'] = 0
                this.balance -= this.debts[userObject.name]['amount']
                this.owe -= this.debts[userObject.name]['amount']
            }
        }
    }
}


const richard = new User(12, 'Richard', 400);
const martin = new User(30, 'Martin', 500);

richard.CreateDebt(martin, 30);
richard.CreateDebt(martin, 12);
richard.PayDebt(martin, 32)
console.log(richard.debts)
console.log(richard)