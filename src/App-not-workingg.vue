<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <tree
      :data="items"
      :options="options"
      ref="tree"
    />
    <pre>
      items
      {{ items }}
    </pre>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import data from '../data/data.json'
function getTreeData2 () {
  return [
    {
      MY_TEXT: 'JS: The Right Way',
      OPTIONS: { expanded: true },
      KIDS: [
        { MY_TEXT: 'Getting Started (NOT DRAGGABLE)', OPTIONS: { checked: true, draggable: false } },
        { MY_TEXT: 'JavaScript Code Style', OPTIONS: { selected: true } },
        { MY_TEXT: 'MVC Pattern (NOT DROPABLE)', OPTIONS: {dropable: false} },
        { MY_TEXT: 'MVP Pattern (NOT DROPABLE)', OPTIONS: {dropable: false} },
        { MY_TEXT: 'MVVM Pattern' },
        { MY_TEXT: 'The Good Parts', KIDS: [
          { MY_TEXT: 'OBJECT ORIENTED', OPTIONS: { checked: true }  },
          { MY_TEXT: 'ANONYMOUS FUNCTIONS', OPTIONS: { checked: true }  },
          { MY_TEXT: 'FUNCTIONS AS FIRST-CLASS OBJECTS', OPTIONS: { checked: true }  },
          { MY_TEXT: 'LOOSE TYPING', OPTIONS: { checked: true }  }
        ]},
        { MY_TEXT: 'Patterns', KIDS: [
          { MY_TEXT: 'DESIGN PATTERNS', OPTIONS: { expanded: true }, KIDS: [
            { MY_TEXT: 'Creational Design Patterns', KIDS: [
              { MY_TEXT: 'Factory' },
              { MY_TEXT: 'Prototype' },
              { MY_TEXT: 'Mixin' },
              { MY_TEXT: 'Singleton' }
            ]},
            { MY_TEXT: 'Structural Design Patterns'}
          ]},
          { MY_TEXT: 'MV* PATTERNS', KIDS: [
            { MY_TEXT: 'MVC Pattern' },
            { MY_TEXT: 'MVP Pattern' },
            { MY_TEXT: 'MVVM Pattern' }
          ]}
        ]},
        { MY_TEXT: 'NOT Draggable VIA function', data: { isNotDraggable: true } }
      ]
    },
    { MY_TEXT: 'Game Engines', OPTIONS: { expanded: true }, KIDS: [
      { MY_TEXT: 'MelonJS' },
      { MY_TEXT: 'ImpactJS' },
      { MY_TEXT: 'LimeJS' },
      { MY_TEXT: 'NOT DROPPADBLE VIA function', data: { isNotDroppable: true } },
    ]}
  ]
}

export default {
  name: 'App',
  data: () => ({
    /* example 3 */
    treeData3: getTreeData2(),
    treeOptions3: {
      propertyNames: {
        text: 'MY_TEXT',
        children: 'KIDS',
        state: 'OPTIONS'
      },
      deletion: true,
      dnd: {
        onDragStart(node) {
          return node.data.isNotDraggable !== true
        },
        onDragOn(targetNode, destinationNode, dropPosition) {
          console.log('onDragOn', targetNode.text, destinationNode.text, dropPosition)
          return destinationNode.data.isNotDroppable !== true
        },
        onDragFinish(targetNode, destinationNode, dropPosition) {
          console.log('onDragFinish', `Target: ${targetNode.text}`, `Destination: ${destinationNode.text}`, dropPosition)
          return destinationNode.data.isNotDroppable !== true
        }
      },
      checkbox: true
    }
  }),

  methods: {
    initTree2() {
      this.treeData2 = new Promise(resolve => {
        setTimeout(() => resolve(getTreeData2()), 2600)
      })

      this.treeData2.then(data => {
        data[0].state = {}
      })
    }
  },

  // mounted: () => {
  //   setTimeout(() => {
  //     this.$refs.tree.updateData('Item 1', node => {
  //       console.log('node ', node)
  //       return { text: 'New Item!' }
  //     });
  //   }, 1000)
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
