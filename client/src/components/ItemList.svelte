<script>
  import Item from './Item.svelte'

  export let items = []
</script>

<div class="container">
  {#each items as item}
    <Item {item} />
  {/each}
</div>
