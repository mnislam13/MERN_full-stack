function person() {
    this.role = "Trainee";
    this.gender = "male";
}

var person1 = new person();
console.log(person1.role);
console.log(person1.id);

person1.id=30144;
console.log(person1.id);