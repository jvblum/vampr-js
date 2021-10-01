class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(...offspring) {
    for (const ein of offspring) {
      this.offspring.push(ein);
      ein.creator = this;
    }
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    return this.traceAncestors.length;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal)
      return true;
    else
      return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    // if root;
    if (this.numberOfVampiresFromOriginal === 0)
      return this; 
    if (vampire.numberOfVampiresFromOriginal === 0)
      return vampire;
    
    // if self;
    if (this === vampire)
      return this;

    // if direct ancestor;
    if (this === vampire.creator) 
      return this;
    if (vampire === this.creator)
      return vampire;

    // other cases - compare lineage;

    const thisAncestors = this.traceAncestors;
    const otherAncestors = vampire.traceAncestors;

    for (const elmA of thisAncestors) {
      for (const elmB of otherAncestors) {
        if (elmA === elmB) 
          return elmA;
      }
    }

    return null;
  }

  get traceAncestors() {
    let currentVampire = this;
    let ancestors = [];

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      ancestors.push(currentVampire);
    }

    return ancestors;

  };
}

module.exports = Vampire;