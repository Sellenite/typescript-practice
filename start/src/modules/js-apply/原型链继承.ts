// 在ts里使用构造函数的兼容处理
// 参考 https://www.jb51.net/article/203728.htm
interface Animal {
  name: string,
  age?: number,
  colors?: Array<string> | string,
  getName(): string
}

interface AnimalConstructor {
  new (name: string, age: number): Animal, // 声明可以作为构造函数调用
  prototype: Animal
}

interface Dog extends Animal {

}

interface DogConstructor {
  new (name: string, age: number): Dog, // 声明可以作为构造函数调用
  prototype: Dog
}

function Animal(this: Animal, name: string) {
  this.name = name;
  this.colors = ['black', 'white'];
}

Animal.prototype.getName = function() {
  return this.name;
}

const Dog = function (this: any, name: string, age: number) {
  Animal.call(this, name);
  this.age = age;
} as any as DogConstructor // 类型不兼容，二次转型，必须使用函数表达式这个语法才不会错误

// 组合寄生继承，为了避免组合继承调用了两次父类的构造函数
/**
 * 组合继承的实现，但因为执行了两次父类的构造函数，并不是最优解
 * Dog.prototype = new Animal();
 * Dog.prototype.constructor = Dog
 */
Dog.prototype = Object.create(Animal.prototype);
// 重新设定Dog的constructor吗，否则上一行的代码会造成Dog.prototype.constructor为Animal，而不是他自身
Dog.prototype.constructor = Dog;

// 自我实现组合寄生继承方法，相当于Object.create
function object(o: object) {
  // new的时候构造函数需要有new，否则会提示This expression is not constructable
  const F = function() {} as any as { new (): any, prototype: any };
  F.prototype = o;
  return new F();
}

Dog.prototype = object(Animal.prototype); // 等同于Object.create
Dog.prototype.constructor = Dog;

const dog = new Dog('doge', 1);
const dog2 = new Dog('akita', 2);

console.log(dog.getName());
console.log(dog2.getName());
