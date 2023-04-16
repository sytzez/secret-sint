const INTERVAL_BETWEEN_PEPERNOTEN = 500

const ANIMATION_DURATION = 15000

const SIMULTANEOUS_PEPERNOTEN =
  Math.ceil(ANIMATION_DURATION / INTERVAL_BETWEEN_PEPERNOTEN) + 1

const GOLDEN_RATIO = (1 + Math.sqrt(5)) * 0.5

const RANDOMNESS = 0.05

const PEPERNOOT_PROTOTYPE = (() => {
  const element = document.createElement('DIV')
  element.className = 'pepernoot'
  return element
})()

export default class Pepernoten {
  protected intervalId?: NodeJS.Timer

  protected pepernoten: HTMLElement[] = []

  protected lastPosition = Math.random()

  constructor(protected container: HTMLElement) {}

  public start() {
    this.intervalId = setInterval(
      () => this.addPepernoot(),
      INTERVAL_BETWEEN_PEPERNOTEN,
    )
  }

  public stop() {
    clearInterval(this.intervalId)
    setTimeout(() => this.cleanUp(), ANIMATION_DURATION)
  }

  protected addPepernoot() {
    if (this.pepernoten.length > SIMULTANEOUS_PEPERNOTEN) {
      const lastPepernoot = this.pepernoten.shift()!
      this.container.removeChild(lastPepernoot)
    }

    const pepernoot = PEPERNOOT_PROTOTYPE.cloneNode() as HTMLElement
    pepernoot.style.left = `${this.nextPosition() * 100}%`
    this.container.appendChild(pepernoot)

    this.pepernoten.push(pepernoot)
  }

  // To spread the pepernoten out in a visually harmonious way, we shift the
  // starting position of each new pepernoot by the GOLDEN_RATIO of the screen width.
  protected nextPosition(): number {
    const randomOffset = -RANDOMNESS + RANDOMNESS * Math.random() * 2
    this.lastPosition = (this.lastPosition + GOLDEN_RATIO + randomOffset) % 1
    return this.lastPosition
  }

  protected cleanUp() {
    this.pepernoten.forEach((pepernoot) => {
      this.container.removeChild(pepernoot)
    })
  }
}
