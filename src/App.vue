<template>
  <div>
    <!-- <pre>
      last-Action
      {{ lastEventAction }}
      last-Id
      {{ lastEventId }}
      events-list-length
      {{ eventsListLength }}
    </pre> -->
    <pre>
      <!-- children
      {{ children }} -->
      items
      {{ items }}
    </pre>
    <div>
      <tree
        @click.native="expandedCheck()"
        :data="items"
        :options="options"
        ref="tree"
      >
        <div slot-scope="{ node }" class="node-container">
          <div class="node-text">{{ node.id }}</div>
          <!-- <div class="node-id">{{ node.id }}</div> -->
          <div class="node-controls">
            <a href="#" @mouseup.stop="editNode(node)">Edit</a>
          </div>
        </div>                
      </tree>
      <button @click="updateAttempt()">click me</button>
    </div>
  </div>
</template>

<script>
import { API } from './api/api'
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
      items: [
        // { 
        //   text: 'unpopulated 1',
        //   data: { id: 1 }
        // }
      ],
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
  async mounted() {
    this.$nextTick(() => {
      this.placeInitialRecord()
      // THIS WORKS! 
      // this.$refs.tree.updateDataTwo = (arg) => {
      //   console.log('arg happened ', arg)
      // }

      ////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////
      // 
      //                  SUPER COOL CODE THAT 
      //          WRITES OVER the - "updateData" function
      //
      ////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////

      // this.$refs.tree.updateData = (criteria, callback) => {
      //   const nodes = this.$refs.tree.findAll(criteria);

      //   nodes.forEach((node) => {
      //     console.log('node ', node)
      //     // node.data = { id: node.data.id }
      //     node.setData(callback(node))
      //   }) 

      //   return nodes;
      // }
      ////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////


    })

    eventsList.forEach((e) => {
      this.$refs.tree.$on(e.name, this.initEventViewer(e))
    })
    this.children = await this.getChildren(this.initialParentId)
    // this.children = (async function main() {
    //   try {

    //   } catch (err) {
    //     // handle error
    //   }
    // })()
    // this.formatDataForTree()
    console.log('☎️')
    console.log('children ', this.children)
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
    editNode(node, e) {
      console.log('e ', e)
      node.startEditing()
    },
    updateAttempt() {
      // this.$refs.tree.updateData('My NEW Node')
      this.$refs.tree.updateData({ id: 'id-1' }, node => {
        node.select();

        return { 
          text: 'Item 2',
          id: 'id-3'
        }
      });
      
    },
    async getChildren(parent_id) {
      // let children
      // return new Promise((resolve, reject) => {
      //   const api = api
      //     .get_child_fields(parent_id)
      //     .then((response) => {
      //       let children = JSON.parse(JSON.stringify(response.data))
      //       return children
      //     })
      //     .catch((error) => {
      //       console.log(error)
      //       reject(error)
      //     })
      //   console.log('api')
      //   resolve(api)
      // })
      try {
        const response = await api.get_child_fields(parent_id)
        return Promise.resolve(JSON.parse(JSON.stringify(response)))
      } catch (err) {
        return err
      }
      //   .then((response) => {
      //     let children = JSON.parse(JSON.stringify(response.data))
      //     return children
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //     reject(error)
      //   })
      // console.log('api')
      // resolve(api)
      // })

      // return Promise.resolved(children)
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

    placeInitialRecord() {
      
    // eslint-disable-next-line
      // const record = 'something'
 

      // let selectedNodeToAppendTo = this.$refs.tree.find({ data: { id: 1 } })[0]

      // console.log('selected node ', selectedNodeToAppendTo)


      // this.$refs.tree.updateData('unpopulated 1', node => {
      //   node.select();
      //   return { text: 'Item 2' };
      // });

      this.$refs.tree.append({
        text: 'My NEW Node',
        id: 'id-1',
        state: { selected: true }
      })
      // this.$refs.tree.updateData(selectedNodeToAppendTo, node => {
      //   node.select();
      //   return { text: 'item 2'}
      // })

      // let selectedNodeToAppendTo = this.$refs.tree.find({ data: { id: 3 } })[0]
      // console.log('selected node ', selectedNodeToAppendTo)
      // if (!(this.$refs.tree.find({ data: { id: 33 } }).length > 0)) {
      //   selectedNodeToAppendTo.append({
      //     text: 'item 3.3',
      //     data: { id: 33 },
      //   })
      // }
      
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
