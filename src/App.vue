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
    </pre>
    <div>
      <tree
        @click.native="expandedCheck()"
        :data="items"
        :options="options"
        ref="tree"
      >
      </tree>
    </div>
  </div>
</template>

<script>
import { dataOne } from '../data/items-one.js'
const eventsList = [
  { name: 'node:expanded', args: ['Node'] },
  { name: 'node:collapsed',  args: ['Node'] }
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
    }
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
    expandedCheck(id) {

      console.log('id you would use to know which one to add to? ', id)

      // THIS ADDS A NODE
      let selectedNodeToAppendTo = this.$refs.tree.find({ data: {id: 3}})[0]
      console.log('selected node ', selectedNodeToAppendTo)
      if (!(this.$refs.tree.find({ data: {id: 33}}).length > 0)) {
        selectedNodeToAppendTo.append(
        { 
          text: 'item 3.3',
          data: { id: 33 }
        })
      }
      // THIS REMOVES A NODE
      if (this.$refs.tree.find({ data: {id: 2}}).length > 0) {
        console.log("this remove happened")
        this.$refs.tree.find({data: {id: 2}})[0].remove()
      }
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
