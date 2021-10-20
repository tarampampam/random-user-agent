abstract class Version {
  // Returns a random integer between min (inclusive) and max (inclusive)
  protected fromRange(min: number, max: number): number {
    min = Math.ceil(min)

    return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min
  }

  // Returns a random element from passed list
  protected pickRandom(list: string[] | number[]): string | number {
    return list[Math.floor(Math.random() * list.length)]
  }

  // Returns randomized version as a string
  abstract version(): string
}

export const randomChromeVersion = new class extends Version {
  private glue = '.'

  // all versions: https://en.wikipedia.org/wiki/Google_Chrome_version_history
  private variants = {
    major: {min: 93, max: 95}, // periodically we should update those values
    minor: {static: 0},
    patch: {min: 4577, max: 4638},
    build: {min: 36, max: 212},
  }

  version(): string {
    return [
      this.fromRange(this.variants.major.min, this.variants.major.max),
      this.variants.minor.static,
      this.fromRange(this.variants.patch.min, this.variants.patch.max),
      this.fromRange(this.variants.build.min, this.variants.build.max),
    ].join(this.glue)
  }
}

export const mobileVendor = new class extends Version {
  private vendors: string[] = [
    'SM-T510', 'SM-T295', 'SM-T515', 'SM-T860', 'SM-T720', 'SM-T595', 'SM-T290', 'SM-T865', 'SM-T835',
    'SM-T725', 'SM-P610', 'SM-T590', 'SM-P615', 'TV BOX', 'SM-T830', 'Lenovo TB-X505X', 'SM-T500',
    'Lenovo TB-X505F', 'Lenovo TB-X606F', 'SM-P205', 'SM-T505', 'MRX-W09', 'Lenovo YT-X705F',
    'Lenovo TB-X505L', 'MRX-AL09', 'SCM-W09', 'Lenovo TB-X606X', 'P20HD_EEA', 'SM-A105M', 'iPlay_20',
    'Lenovo TB-X606V', 'H96 Max RK3318', 'TVBOX', 'SM-T387V', 'Lenovo YT-X705L', 'Lenovo TB-X306X',
    'Lenovo TB-X306F', 'SM-T870', 'Redmi Note 8 Pro', 'Tab8', 'SM-T970', 'SM-A205G', 'Lenovo TB-X605FC',
    'Lenovo TB-J606F', 'e-tab 20', 'ADT1061', 'SM-T307U', '100003562', 'MBOX', 'Lenovo TB-X605LC',
    'M40_EEA', 'M2003J15SC', '100003561', 'X109', 'Redmi Note 8', 'Lenovo TB-8705F', 'A860', 'SM-A107M',
    'Redmi Note 7', 'BAH3-W09', 'BAH3-L09', 'TX6s', 'SM-T507', 'P20HD_ROW', 'Magnet_G30', 'SM-T875',
    'SM-T387W', 'MI PAD 4', 'Lenovo YT-X705X', 'Lenovo TB-X606FA', 'SM-P200', 'SM-A207M', 'M2004J19C',
    'X104-EEA', 'SM-T837V', 'SM-A307GT', 'AGS3-W09', 'SM-T505N', 'SM-A105F', 'Magnet_G50', 'A850', '8092',
    '100015685-A', 'X88pro10.q2.0.6330.d4', 'SM-T975', 'SM-G973F', 'J5',
  ]

  version(): string {
    return this.pickRandom(this.vendors) as string
  }
}
