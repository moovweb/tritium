package debugger

import "sync"
import tp "tritium/proto"

type BreakpointManager interface {
	SetBreakpoint(*Breakpoint) *Breakpoint
	ClearBreakpoint(*Breakpoint) *Breakpoint
	FindBreakpoint(*Breakpoint) *Breakpoint
	ListBreakpointsInFile(string) []*Breakpoint
	UpdateBreakpoints(slug *tp.Slug)
}

type Breakpoint struct {
	Filename string
	Linenum  int
}

func NewBreakpoint() *Breakpoint {
	return &Breakpoint{}
}

type fileBreakpoints struct {
	bp map[int] *Breakpoint
	//rwlock sync.RWMutex
}

func NewFileBreakpoints() *fileBreakpoints {
	return &fileBreakpoints{bp: make(map[int] *Breakpoint)}
}

type ProjectBreakpoints struct {
	fb map[string]*fileBreakpoints
	slug *tp.Slug
	rwlock sync.RWMutex
}

func InitiateProjectBreakpoints() *ProjectBreakpoints {
	pb := &ProjectBreakpoints{}
	pb.fb = make(map[string]*fileBreakpoints)
	return pb
}

func (pb *ProjectBreakpoints) SetBreakpoint(bp *Breakpoint) *Breakpoint {
	pb.rwlock.Lock()
	defer pb.rwlock.Unlock()
	fb, okfb := pb.fb[bp.Filename]
	if okfb {
		bpIn, okbp := fb.bp[bp.Linenum]
		if okbp {
			return bpIn
		}
	}
	lineNum := pb.slug.FindInstruction(bp.Filename, bp.Linenum)
	if lineNum == 0 {
		return nil
	}
	bp.Linenum = lineNum
	if !okfb {
		fb = NewFileBreakpoints()
		pb.fb[bp.Filename] = fb
	}
	fb.bp[bp.Linenum] = bp
	return bp
}

func (pb *ProjectBreakpoints) ClearBreakpoint(bp *Breakpoint) *Breakpoint {
	pb.rwlock.Lock()
	defer pb.rwlock.Unlock()
	fb, okfb := pb.fb[bp.Filename]
	if okfb {
		bpIn, okbp := fb.bp[bp.Linenum]
		if okbp {
			delete(fb.bp, bp.Linenum)
			return bpIn
		}
	}
	return nil
}

func (pb *ProjectBreakpoints) FindBreakpoint(bp *Breakpoint) *Breakpoint {
	pb.rwlock.Lock()
	defer pb.rwlock.Unlock()
	fb, okfb := pb.fb[bp.Filename]
	if okfb {
		bpIn, okbp := fb.bp[bp.Linenum]
		if okbp {
			return bpIn
		}
	}
	return nil
}

func (pb *ProjectBreakpoints) ListBreakpointsInFile(filename string) []*Breakpoint {
	bps := make([]*Breakpoint, 0, 4)
	pb.rwlock.Lock()
	defer pb.rwlock.Unlock()
	fb, okfb := pb.fb[filename]
	if okfb {
		for _, bp := range fb.bp {
			bps = append(bps, bp)
		}
	}
	return bps
}

func (pb *ProjectBreakpoints) UpdateBreakpoints(slug *tp.Slug) {
	pb.rwlock.Lock()
	defer pb.rwlock.Unlock()
	pb.slug = slug
	for filename, fb := range pb.fb {
		for linenum, _ := range fb.bp {
			newLinenum := pb.slug.FindInstruction(filename, linenum)
			if newLinenum == 0 || newLinenum != linenum {
				delete(fb.bp, linenum)
			}
		}
	}
}
