
const app = new Vue({
    el: '#user-list',
    data: {
        state: 'default',
        tcode: 'create',
        header: 'Users',
        errorMassage: false,
        successMassage: false,
        newItem: {},
        items: []
    },
    computed: {
        reversedItems() {
            //return this.items.slice(0).reverse()
            return this.items
        }
    },
    mounted: function () {
        //this.getAllUsers()
    },
    methods: {
        getAllUsers: function () {
            // hear code for fetch data from REST-API
            axios.get('https://reqres.in/api/users')
                .then(response => response)
                .then(json => this.items=[...json.data.data])
        },
        saveUser: function () {
            this.items.push({ id: Math.random(), ...this.newItem })
            this.newItem = { first_name: "", last_name: "" }
        },
        updateUser: function () {
            this.items = this.items.map(item => item.id === this.newItem.id ? this.newItem : item)
            this.newItem = { first_name: "", last_name: "" }
            this.tcode= 'create'
        },
        changeState: function (newState) {
            this.state = newState,
                this.newItem = { first_name: "", last_name: "" }
        },
        removeUser: function (userid) {
            this.items = this.items.filter(item => item.id !== userid)
            this.newItem = { first_name: "", last_name: "" }
        },
        editUser: function (userid) {
            this.tcode = "update",
                this.state = "Edit",
                this.newItem = { ...this.items.filter(item => item.id === userid)[0] }
        }
    }
})