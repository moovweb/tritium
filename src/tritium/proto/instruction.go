package tritium


func (ins *Instruction) Iterate(itFunc func(*Instruction)) {
	if ins.Children == nil {
		return
	}
	itFunc(ins)
	for _, child := range(ins.Children) {
		child.Iterate(itFunc)
	}
}