<template>
  <div>
    <pre>
      last-Action
      {{ lastEventAction }}
      last-Id
      {{ lastEventId }}
      events-list-length
      {{ eventsListLength }}
    </pre>
    <div>
      <tree
        @click.native="expandedCheck()"
        :data="items"
        :options="options"
        ref="tree"
      >
        <div slot-scope="{ node }" class="node-container">
          <div class="node-text">{{ node.text }}</div>
        </div>
      </tree>
    </div>
  </div>
</template>

<script>
import { API } from '../api'
// import { dataOne } from '../data/items-one' //  ../utils/storage'
const api = new API()

const eventsList = [
  { name: 'node:expanded', args: ['Node'] },
  { name: 'node:collapsed', args: ['Node'] },
]

export default {
  name: 'DisplayChildren',
  props: ['initialParentId'],
  data: () => {
    return {
      // items: dataOne,
      lastEventName: '',
      events: [],
      items: [],
      treeData: [],

      children: [],

      options: {},
    }
  },
  computed: {
    eventsList() {
      return this.events.concat().reverse()
    },
    eventsListLength() {
      console.log('events happened')
      return (this.eventsList || []).length
    },
    lastEvent() {
      const lastElement = this.events.length - 1
      return this.events[lastElement] || {}
    },
    lastEventAction() {
      return (this.lastEvent || {}).name || ''
    },
    lastEventId() {
      return (this.lastEvent || {}).id || 'unknown'
    },
  },
  mounted() {
    eventsList.forEach((e) => {
      this.$refs.tree.$on(e.name, this.initEventViewer(e))
    })

    this.getChildren(this.initialParentId)
    this.formatDataForTree()
    console.log('☎️')
    console.log(this.children)
  },
  watch: {
    eventsListLength: {
      handler(val) {
        if (val > 0) {
          this.expandedCheck(this.lastEventId)
        }
      },
      immediate: true,
    },
  },
  methods: {
    getChildren(parent_id) {
      api
        .get_child_fields(parent_id)
        .then((response) => {
          const children = response.data
          // children.forEach(child => this.children.push(child));
          this.children = children
        })
        .catch((error) => {
          console.log(error)
        })
    },

    formatDataForTree() {
      console.log('🧬')
      console.log(this.children)

      let arrayLength = this.children.length

      console.log('💜')
      console.log(arrayLength)

      console.log('🎯' + arrayLength)

      for (let i = 0; i < arrayLength; i++) {
        console.log('🚣‍♂️')
        // console.log(Object.keys(this.children[i]))
      }

      // var childrenArray[];

      // this.children.forEach(child => {
      //
      //    console.log("🥇");
      //    childrenArray.push({text: child.name });
      //
      // });

      console.log('🇨🇱')
      // console.log(childrenArray);

      // var title = [];
      //
      // for (var i=0; i<3; i++) {
      // title[i] = {
      //     name: "name" + i+1,
      //     age: "age" + i+1,
      //     hometown: "hometown" + i+1
      //     };
      // }
      //
      //
      // const x = {text: "Lorem"};
      // const y = {text: "Ipsum"};
      // const z = {text: "Sit"};
      //
      // // const childrenArray = [x,y,z];
      //
      // console.log("🧧")
      //childrenArray.forEach(element => this.items.push(element));
    },

    expandedCheck(id) {
      console.log('id you would use to know which one to add to? ', id)

      // THIS ADDS A NODE
      let selectedNodeToAppendTo = this.$refs.tree.find({ data: { id: 3 } })[0]
      console.log('selected node ', selectedNodeToAppendTo)
      if (!(this.$refs.tree.find({ data: { id: 33 } }).length > 0)) {
        selectedNodeToAppendTo.append({
          text: 'item 3.3',
          data: { id: 33 },
        })
      }
      // THIS REMOVES A NODE
      if (this.$refs.tree.find({ data: { id: 2 } }).length > 0) {
        console.log('this remove happened')
        this.$refs.tree.find({ data: { id: 2 } })[0].remove()
      }
    },
    initEventViewer(event) {
      const events = this.events

      return function(node, newNode) {
        let nodeText = '-'
        let nodeId = '-'
        let targetNode = newNode && newNode.text ? newNode : node

        if (targetNode && targetNode.text) {
          nodeText = targetNode.text
        }

        if (targetNode && targetNode.id) {
          nodeId = (targetNode.data || {}).id
        }

        events.push(
          Object.assign({}, event, {
            time: new Date(),
            nodeText,
            id: nodeId,
            node: node,
          })
        )
      }
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
