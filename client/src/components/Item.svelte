<script>
  import Shevron from './common/Shevron.svelte'
  import Image from './common/Image.svelte'
  import { getContext } from 'svelte'
  import Common from '../../../common/tools/common.tool'

  export let item
  let isExpanded = true

  const { open } = getContext('simple-modal')

  const show = () => {
    open(Image, { src: getImgSrc() })
  }

  const expand = () => {
    isExpanded = !isExpanded
  }

  const getImgSrc = () => {
    return `/assets/img/${item.path}`
  }
</script>

<div on:click={expand} class:expanded={isExpanded} class="card">
  <div on:click={show} class="card-img">
    <Image src={getImgSrc()} />
  </div>
  <div class="text">
    <div class="text-content">
      <h1 class="title">{item.path}</h1>
      <div class="body-text">
        <p>ШxВ: {item.width} x {item.height}</p>
        <p>XxY: {item.x} x {item.y}</p>
      </div>
    </div>
  </div>
  <Shevron />
</div>
