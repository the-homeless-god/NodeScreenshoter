<script>
  import Api from '../../../common/tools/api.tool.ts'

  let siteUrl = ''
  let selector = ''
  const parseSite = async () => {
    await Api.generate(siteUrl, selector)
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

<input class="btn" bind:value={siteUrl} placeholder="Site url" />
<input class="btn" bind:value={selector} placeholder="Selector" />
<button on:click={parseSite} class="btn">></button>
