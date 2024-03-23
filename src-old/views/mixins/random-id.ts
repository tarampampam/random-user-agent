import {defineComponent} from 'vue'

export default defineComponent({
  data(): { randomId: string } {
    return {
      randomId: '__will_be_generated__',
    }
  },

  methods: {
    // Generates unique ID
    generateRandomId(): string {
      return 'id_' + Math.random().toString(36).substring(3)
    },
  },

  mounted() {
    this.randomId = this.generateRandomId()
  },
})
