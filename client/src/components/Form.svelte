<script>
  import { createEventDispatcher } from 'svelte'

  let site = 'http://google.com'
  let selector = '*'

  const dispatch = createEventDispatcher()

  const done = () => {
    dispatch('done', { site: site, selector: selector })
  }
</script>

<style>
  .btn {
    font-size: 18px;
    height: 36px;
  }

  button {
    color: sienna;
    width: 40px;
    background: white;
    border-radius: 50%;
  }
</style>

<input class="btn" bind:value={site} placeholder="Site url" />
<input class="btn" bind:value={selector} placeholder="Selector" />
<button on:click={done} class="btn">></button>
