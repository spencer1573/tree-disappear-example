<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <pre>
      last-Action
      {{ lastEventAction }}
      last-Id
      {{ lastEventId }}
      events-list-length
      {{ eventsListLength }}
      <!-- lastEvent
      {{ lastEvent }} -->
    </pre>
    <div>
      <tree
        @click.native="expandedCheck()"
        :data="items"
        :options="options"
        ref="tree"
      >
        <!-- <div slot-scope="{ node }" class="node-container"> -->
          <!-- <div class="node-text">{{ node.text }}</div> -->
          <!-- <div class="node-controls"> -->
            <!-- <a href="#" @mouseup.stop="editNode(node)">Edit</a>
            <a href="#" @mouseup.stop="removeNode(node)">Remove</a> -->
            <!-- <a href="#" @mouseup.stop="addChildNode(node)">Add child</a> -->
          <!-- </div> -->
        <!-- </div> -->
      </tree>
    </div>
  </div>
</template>

<script>
import { dataOne } from '../data/items-one.js'
// import { dataTwo } from '../data/items-two.js'
const eventsList = [
  // { name: 'tree:mounted', args: ['Tree Component'] },
  // { name: 'tree:filtered', args: ['Matches', 'Filter String'] },
  // { name: 'tree:data:fetch', args: ['Parent Node'] },
  // { name: 'tree:data:received', args: ['Parent Node'] },

  // { name: 'node:clicked', args: ['Node']},
  // { name: 'node:disabled', args: ['Node']},
  // { name: 'node:enabled', args: ['Node']},
  // { name: 'node:shown', args: ['Node'] },
  // { name: 'node:hidden', args: ['Node'] },
  // { name: 'node:dblclick', args: ['Node'] },
  // { name: 'node:selected', args: ['Node'] },
  // { name: 'node:unselected', args: ['Node'] },
  // { name: 'node:checked', args: ['Node'] },
  // { name: 'node:unchecked', args: ['Node'] },
  { name: 'node:expanded', args: ['Node'] },
  { name: 'node:collapsed',  args: ['Node'] },
  // { name: 'node:added',  args: ['Node', 'New Node'] },
  // { name: 'node:removed',  args: ['Node'] },
  // { name: 'node:text:changed', args: ['Node', 'New Text', 'Old Text']},

  // { name: 'node:editing:start',  args: ['Node'] },
  // { name: 'node:editing:stop',  args: ['Node', 'isTextChanged'] },
]

export default {
  name: 'App',
  data: () => {
    return {
      // items: dataOne,
      lastEventName: '',
      events: [],
      items: dataOne,
      treeData: [
        { text: 'Item 1' },
        { text: 'Item 2' },
        { text: 'Item 3', state: { selected: true } },
        { text: 'Item 4' }
      ],
      options: {
        checkbox: true
      }
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
      return (this.events[lastElement] || {})
    },
    lastEventAction() {
      return (this.lastEvent || {}).name || ''
    },
    lastEventId() {
      return (this.lastEvent || {}).id || 'unknown'
      // return (this.lastEvent.data || {}).id || 'unknown'
    },
      // return (this.events[lastElement] || {}).name || ''
    // lastEventName() {
    //   return this.lastEventRaw
    // }
  },
  mounted () {
    eventsList.forEach(e => {
      this.$refs.tree.$on(e.name, this.initEventViewer(e))
    })
  },
  watch: {
    eventsListLength: {
      handler(val) {
        if (val > 0) {
          this.expandedCheck(this.lastEventId)
        }
      },
      immediate: true
    }
  },
  methods: {
    // addChildNode(node) {
    //   if (node.enabled()) {
    //     node.append('New Node')
    //   }
    // },
    expandedCheck(id) {
      console.log('id ', id)
      // this.$refs.tree.updateData({ data: { id: id}}, node => {
      //   console.log('node ', node)
      //   return { text: 'New Item!' }
      // })
      // this.$refs.tree.updateData({ data: { id: id}}, node => {
      //   console.log('node ', node)
      //   return { text: 'New Item!' }
      // })
      // const node = this.lastEvent.node
      // let selectedNodeToAppendTo = this.$refs.tree.findAll({ data: {icon: 32}})
      let selectedNodeToAppendTo = this.$refs.tree.find({ data: {id: 3}})[0]
      console.log('selected node ', selectedNodeToAppendTo)
      // this.addChildNode(selectedNodeToAppendTo)
      // this.$refs.tree.append(
      //   {data: {id: 3}},
      //   'item 3'
      // )
      // this.$refs.tree = this.$refs.tree.append(
      //   { text: 'Item 1' },              // search criteria
      //   'New CHILD Node for "My super Text"'    // this string will be converted to Node object with default state parameters
      // )
      if (!(this.$refs.tree.find({ data: {id: 33}}).length > 0)) {
        selectedNodeToAppendTo.append(
        { 
          text: 'item 3.3',
          data: { id: 33 }
        })
      }
      if (this.$refs.tree.find({ data: {id: 2}}).length > 0) {
        console.log("this remove happened")
        this.$refs.tree.find({data: {id: 2}})[0].remove()
      }
      // let selection = this.$refs.tree.findAll({ state: { expanded: true } })
      // selection.toggleCollapse
    },
    initEventViewer(event) {
      const events = this.events
    
      return function (node, newNode) {
        let nodeText = '-'
        let nodeId = '-'
        let targetNode = newNode && newNode.text ? newNode : node

        if (targetNode && targetNode.text) {
          nodeText = targetNode.text
        }

        if (targetNode && targetNode.id) {
          // nodeId = targetNode.id
          nodeId = (targetNode.data || {}).id
        }

        events.push(
          Object.assign(
            {},
            event,
            { time: new Date, nodeText, id: nodeId, node: node }
          )
        )
      }
    }
  }
  // mounted: () => {
    // setTimeout(() => {
    //   this.$refs.tree.updateData('Item 1', node => {
    //     console.log('node ', node)
    //     return { text: 'New Item!' }
    //   });
    // }, 1000)
  // }
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
