let list = {
    classes: [],
    attributes: [],
    items: [],
    addClass: function(className){
        this.classes.push(className);
    },
    addAtribute: function(attributeName, attributeValue){
        let attr = {
            name: '',
            value: ''
        }

        attr.name = attributeName;
        attr.value = attributeValue;

        this.attributes.push(attr);
    },
    addItem: function(item){
        this.items.push(item);
    },
    render(){
        let ul = document.createElement("ul");

        this.classes.forEach(function(cl){
            ul.classList.add(cl);
        });

        this.items.forEach(function(item){
            let li = document.createElement("li");
            li.innerText = item.text;
        
            ul.append(li);

        });

        document.body.prepend(ul);
    }
}

let texts = [
    "Главная", 
    "Блог", 
    "О нас", 
    "Контакты"
];

texts.forEach(function(text){
    let item = {
        text: '',
        setText: function(text){
            this.text = text;
        }
    }

    item.setText(text);

    list.addItem(item);
});

list.addClass("list-unstyled");
list.addClass("list-inline");

list.render();