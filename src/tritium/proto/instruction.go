package tritium


func (ins *Instruction) Iterate(itFunc func(*Instruction)) {
	itFunc(ins)
	if ins.Children == nil {
		return
	}
	for _, child := range(ins.Children) {
		child.Iterate(itFunc)
	}
}