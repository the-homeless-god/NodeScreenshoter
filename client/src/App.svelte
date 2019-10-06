<script>
  import Modal from 'svelte-simple-modal'

  import Form from './components/Form.svelte'
  import ItemList from './components/ItemList.svelte'

  import Api from '../../common/tools/api.tool'

  let items = []

  const parseSite = async event => {
    console.log(event)
    items = await Api.generate(event.detail.site, event.detail.selector)
    console.log(items)
  }
</script>

<Modal>
  <Form on:done={parseSite} />

  <ItemList {items} />
</Modal>
