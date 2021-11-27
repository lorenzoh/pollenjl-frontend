export const documents =
    
[
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.run",
        "title": "run",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.DistanceLoss",
        "title": "DistanceLoss",
        "text": " A supervised loss that can be simplified to L(targets, outputs) = L(targets - outputs)  is considered distance - based ."
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.update",
        "title": "update",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.WorkerPool",
        "title": "WorkerPool",
        "text": ""
    },
    {
        "doctype": "document",
        "id": "documents/docs/datacontainers.md",
        "title": "Datasets you can use",
        "text": " Datasets you can use DataLoaders . jl is built to integrate with the further ecosystem and builds on a common interface to support datasets .  We call such a dataset a  data container  and it needs to support the following operations: getobs(data, i)  loads the  i - th observation from a dataset nobs(data)  gives the number of observations in a dataset . Basic data containers The simplest data container is a vector of values: using  DataLoaders\n @show   v  =  rand ( 1 : 10 ,  10 )\n @show   nobs ( v )\n getobs ( v ,  1 ) v = rand(1:10, 10) = [9, 5, 6, 3, 10, 7, 4, 4, 8, 6]\nnobs(v) = 10\n Multi - dimensional arrays also work, with the last dimension treated as the observation dimension: a  =  rand ( 50 ,  50 ,  10 )\n summary ( getobs ( a ,  1 ) )  50×50 Matrix{Float64} You can also group multiple data containers with the same length together by putting them into a  Tuple : data  =  ( v ,  a )\n getobs ( data ,  1 )  You can pass any data container to  DataLoader  to create an iterator over batches: for  batch  in  DataLoader ( v ,  2 )\n     @assert   size ( batch )  ==  ( 2 , )\n end\n\n for  batch  in  DataLoader ( a ,  2 ) \n     @assert   size ( batch )  ==  ( 50 ,  50 ,  2 )\n end\n\n for  ( vs ,  as )  in  DataLoader ( ( v ,  a ) ,  2 ) \n     @assert   size ( vs )  ==  ( 2 , )\n     @assert   size ( as )  ==  ( 50 ,  50 ,  2 )\n end Out - of - memory data containers Arrays, of course, are kept in memory, so we (1) cannot use them to store larger - than - memory datasets (2) don ’ t need to use multithreading since loading an observation just involves indexing an array which is generally fast . One way to quickly get into the territory of too - large - to - fit in memory is to work with image datasets .  So instead of loading every image of a dataset into an array, we ’ ll implement a data container that stores only the file names of each image .  It will load the image itself only when  getobs  is called .  To do that we ’ ll implement a  struct  that stores a vector of file names, and implement  getobs  and  nobs  for that type . import  DataLoaders . LearnBase :  getobs ,  nobs\n using  Images\n\n struct   ImageDataset\n     files :: Vector { String }\n end\n ImageDataset ( folder :: String )  =  ImageDataset ( readdir ( folder ) )\n\n nobs ( data :: ImageDataset )  =  length ( data . files )\n getobs ( data :: ImageDataset ,  i :: Int )  =  Images . load ( data . files [ i ] ) Now, if we have a folder full of images, we can create a data container and load them quickly into batches as follows: data  =  ImageDataset ( \"path/to/my/images\" )\n for  images  in  DataLoader ( data ,  16 ,  collate  =  false )\n    # Do something\n  end Preprocessing Above we pass the  collate = false  argument because images may be of different sizes that cannot be collated .  See  collate .  In practice, it is common to apply some cropping and resizing to images so that they all have the same size . Threads To use  DataLoaders ’  multi - threading, you need to start Julia with multiple threads .  Check the number of available threads with  Threads.nthreads() ."
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.deriv",
        "title": "deriv",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.grad",
        "title": "grad",
        "text": " Return the gradient of the learnable parameters w . r . t .  some objective"
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.getobs",
        "title": "getobs",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.PoolFailedException",
        "title": "PoolFailedException",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.sumvalue",
        "title": "sumvalue",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.PoolState",
        "title": "PoolState",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.deriv2",
        "title": "deriv2",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.isstrictlyconvex",
        "title": "isstrictlyconvex",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.BatchDimLast",
        "title": "BatchDimLast",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.istwicedifferentiable",
        "title": "istwicedifferentiable",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.default_obsdim",
        "title": "default_obsdim",
        "text": " default_obsdim ( data ) The specify the default obsdim for a specific type of data . Defaults to  ObsDim.Undefined()"
    },
    {
        "doctype": "document",
        "id": "documents/docs/howto/workingwith.md",
        "title": "workingwith",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.GetObsParallel",
        "title": "GetObsParallel",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.obsslice",
        "title": "obsslice",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.targetdomain",
        "title": "targetdomain",
        "text": " Returns an AbstractSet representing valid output/target values"
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.Running",
        "title": "Running",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.DataLoaders",
        "title": "DataLoaders",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.BatchDimFirst",
        "title": "BatchDimFirst",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.AbstractObsView",
        "title": "AbstractObsView",
        "text": " abstract  AbstractObsView { TElem ,  TData }  <:  DataView { TElem ,  TData } Baseclass for all vector - like views of some data structure, that views it as some form or vector of observations . see  MLDataPattern.ObsView  for a concrete example ."
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.ObsIterator",
        "title": "ObsIterator",
        "text": " abstract  ObsIterator { TElem , TData }  <:  DataIterator { TElem , TData } Baseclass for all types that iterate over some data source one observation at a time . using  MLDataPattern\n @assert   typeof ( RandomObs ( X ) )  <:  ObsIterator\n\n for  x  in  RandomObs ( X )\n    # ...\n  end see  MLDataPattern.RandomObs"
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.StochasticTransformation",
        "title": "StochasticTransformation",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.meanvalue",
        "title": "meanvalue",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.isconvex",
        "title": "isconvex",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.Done",
        "title": "Done",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.collate",
        "title": "collate",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.value_deriv",
        "title": "value_deriv",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.Loss",
        "title": "Loss",
        "text": " Baseclass for all losses .  A loss is some (possibly simplified) function  L(features, targets, outputs) , where  outputs  are the result of some function  f(features) ."
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.BatchDim",
        "title": "BatchDim",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.value",
        "title": "value",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.UnsupervisedLoss",
        "title": "UnsupervisedLoss",
        "text": " A loss is considered  unsupervised , if all the information needed to compute  L(features, targets, outputs)  are contained in features  and  outputs , and thus allows for the simplification L(features, outputs) ."
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.Cost",
        "title": "Cost",
        "text": " Baseclass for any kind of cost .  Notable examples for costs are  Loss  and  Penalty ."
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.addgrad!",
        "title": "addgrad!",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.isnemitski",
        "title": "isnemitski",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.SupervisedLoss",
        "title": "SupervisedLoss",
        "text": " A loss is considered  supervised , if all the information needed to compute  L(features, targets, outputs)  are contained in targets  and  outputs , and thus allows for the simplification L(targets, outputs) ."
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.islipschitzcont",
        "title": "islipschitzcont",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.obsslices",
        "title": "obsslices",
        "text": " obsslices ( batch ,  batchdim  =  BatchDimLast ( ) ) Iterate over views of all observations in a  batch . batch  can be a batched array, a tuple of batches, or a dict of batches . batch  =  rand ( 10 ,  10 ,  4 )  # batch size is 4\n iter  =  obsslices ( batch ,  BatchDimLast ( ) )\n @assert   size ( first ( iter ) )  ==  ( 10 ,  10 )\n\n iter2  =  obsslices ( batch ,  BatchDimFirst ( ) )\n @assert   size ( first ( iter ) )  ==  ( 10 ,  4 )"
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.isclipable",
        "title": "isclipable",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.update!",
        "title": "update!",
        "text": ""
    },
    {
        "doctype": "document",
        "id": "documents/docs/shuffling.md",
        "title": "Shuffling, subsetting, sampling",
        "text": " Shuffling, subsetting, sampling Shuffling your training data every epoch and splitting a dataset into training and validation splits are common practices . While  DataLoaders  itself only provides tools to load your data effectively, using the underlying  MLDataPattern  package makes these things easy . Examples Shuffling using  MLDataPattern :  shuffleobs\n\n data  =  ...\n dataloader  =  DataLoader ( shuffleobs ( data ) ,  batchsize ) Subsetting using  MLDataPattern :  datasubset\n\n data  =  ...\n idxs  =  1 : 1000  # indices to select from dataset\n  \n dataloader  =  DataLoader ( datasubset ( data ,  idxs ) ) ,  batchsize ) Train/validation split using  MLDataPattern :  splitobs\n    \n data  =  ...\n traindata ,  valdata  =  splitobs ( data ,  0.8 )  # 80/20 split\n dataloader  =  DataLoader ( shuffleobs ( data ) ,  batchsize ) But wait, there ’ s more For other dataset operations like weighted sampling, see  this section  in MLDataPattern ’ s documentation ."
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.islocallylipschitzcont",
        "title": "islocallylipschitzcont",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.datasubset",
        "title": "datasubset",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.copyrec!",
        "title": "copyrec!",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders._batchsize",
        "title": "_batchsize",
        "text": ""
    },
    {
        "doctype": "document",
        "id": "documents/docs/status.md",
        "title": "TODOs",
        "text": " TODOs Features make compatible with  ObsDim s Documentation document data iterators better document port  PyTorch custom dataset tutorial"
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.isminimizable",
        "title": "isminimizable",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.DiscreteSet",
        "title": "DiscreteSet",
        "text": " Set of discrete items"
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.Failed",
        "title": "Failed",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.getobs!",
        "title": "getobs!",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.MarginLoss",
        "title": "MarginLoss",
        "text": " A supervised loss, where the targets are in  { - 1, 1}, and which can be simplified to  L(targets, outputs) = L(targets * outputs) is considered  margin - based ."
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.targets",
        "title": "targets",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.Learnable",
        "title": "Learnable",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.isclasscalibrated",
        "title": "isclasscalibrated",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.prox",
        "title": "prox",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.transform!",
        "title": "transform!",
        "text": " Do a forward pass, and return the output"
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.Transformation",
        "title": "Transformation",
        "text": " Anything that takes an input and performs some kind of function to produce an output .  For example a linear prediction function ."
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.BatchIterator",
        "title": "BatchIterator",
        "text": " abstract  BatchIterator { TElem , TData }  <:  DataIterator { TElem , TData } Baseclass for all types that iterate over of some data source one batch at a time . @assert   typeof ( RandomBatches ( X ,  size = 10 ) )  <:  BatchIterator\n\n for  x  in  RandomBatches ( X ,  size = 10 )\n     @assert   nobs ( x )  ==  10\n    # ...\n end see  MLDataPattern.RandomBatches"
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.scaled",
        "title": "scaled",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.transform",
        "title": "transform",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.isfishercons",
        "title": "isfishercons",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.prox!",
        "title": "prox!",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.IntervalSet",
        "title": "IntervalSet",
        "text": " A continuous range (inclusive) between a lo and a hi"
    },
    {
        "doctype": "document",
        "id": "documents/docs/quickstartpytorch.md",
        "title": "Comparison to PyTorch",
        "text": " Comparison to PyTorch This package is inspired by Pytorch ’ s  torch.utils.data.DataLoader  and works a lot like it .  The basic usage for both is  DataLoader(dataset, batchsize) , but for other use cases there are some differences . The most important things are: DataLoaders . jl supports only map - style datasets at the moment It uses thread - based parallelism instead of process - based parallelism Detailed comparison Let ’ s go through every argument to  torch.utils.data.DataLoader  and have a look at similarities and differences .  See  DataLoader  for a full list of its arguments . dataset : This package currently only supports map - style datasets which work similarly to Python ’ s, but instead of implementing  __getindex__  and  __len__ , you ’ d implement  LearnBase.getobs  and  nobs .   More info here . batch_size = 1 : If not specified otherwise, the default batch size is 1 for both packages .  In DataLoaders . jl, you can additionally pass in  nothing  to turn off batching . shuffle = false : This package ’ s  DataLoader  does  not  support this argument .  Shuffling should be applied to the dataset beforehand .  See  working with data containers . collate_fn : DataLoaders . jl collates batches by default unless  collate = false  is passed .  A custom collate function is not supported, but you can extend  DataLoaders.collate  for custom data types for the same effect . drop_last = False .  DataLoaders . jl has the same behavior of returning a partial batch by default, but the keyword argument is  partial = false  with  partial = not drop_last . prefetch_factor : This cannot be customized currently .  The default behavior for DataLoaders . jl is for every thread to be preloading one batch . pin_memory : DataLoaders . jl does not interact with the GPU, but you can do this in your data container . num_workers ,  persistent_workers ,  worker_init_fn ,  timeout : Unlike PyTorch, this package does not use multiprocessing, but multithreading which is not practical in Python due to the GIL .  As such these arguments do not apply .  Currently, DataLoaders . jl will use either all threads except the primary one or all threads based on the keyword argument  useprimary = false . sampler ,  batch_sampler ,  generator : This package does not currently support these arguments for customizing the randomness ."
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.Penalty",
        "title": "Penalty",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.isdistancebased",
        "title": "isdistancebased",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.DataView",
        "title": "DataView",
        "text": " abstract  DataView { TElem ,  TData }  <:  AbstractVector { TElem } Baseclass for all vector - like views of some data structure . This allow for example to see some design matrix as a vector of individual observation - vectors instead of one matrix . see  MLDataPattern.ObsView  and  MLDataPattern.BatchView  for examples ."
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.@unpack_BatchViewCollated",
        "title": "@unpack_BatchViewCollated",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.Minimizable",
        "title": "Minimizable",
        "text": " Baseclass for any prediction model that can be minimized . This means that an object of a subclass contains all the information needed to compute its own current loss ."
    },
    {
        "doctype": "document",
        "id": "documents/docs/overview.md",
        "title": "Overview",
        "text": " Overview The central function in  DataLoaders  is, of course,  DataLoader . It provides a wrapper around a parallel data iterator,  eachobsparallel Finally,  batchviewcollated  provides a lazy view of collated batches with support for inplace loading ."
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.batchviewcollated",
        "title": "batchviewcollated",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.eachobsparallel",
        "title": "eachobsparallel",
        "text": " eachobsparallel ( data;  useprimary  =  false ,  buffered  =  true ) Parallel data iterator for data container  data .  Loads data on all available threads (except the first if  useprimary  is  false ) . If  buffered  is  true , uses  getobs!  to load samples inplace . See also  MLDataPattern.eachobs Order eachobsparallel  does not guarantee that the samples are returned in the correct order ."
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.isstronglyconvex",
        "title": "isstronglyconvex",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.meanderiv",
        "title": "meanderiv",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.islipschitzcont_deriv",
        "title": "islipschitzcont_deriv",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.LearnBase",
        "title": "LearnBase",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.isdifferentiable",
        "title": "isdifferentiable",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.isunivfishercons",
        "title": "isunivfishercons",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.sumderiv",
        "title": "sumderiv",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.learn!",
        "title": "learn!",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.inputdomain",
        "title": "inputdomain",
        "text": " Returns an AbstractSet representing valid input values"
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.batchindices",
        "title": "batchindices",
        "text": " batchindices ( n ,  size ,  i ) Get the indices of batch  i  with batch size  size  of a collection with  n  elements . Might be a partial batch if  i  is the last batch and n  is not divisible by  size ."
    },
    {
        "doctype": "document",
        "id": "documents/README.md",
        "title": "DataLoaders.jl",
        "text": " DataLoaders . jl Documentation (latest) A Julia package implementing performant data loading for deep learning on out - of - memory datasets that works like PyTorch ’ s  DataLoader . What does it do? Uses multi - threading to load data in parallel while keeping the primary thread free for the training loop Handles batching and collating Is simple to extend for custom datasets Integrates well with other packages in the ecosystem Allows for inplace loading to reduce memory load When should you use it? You have a dataset that does not fit into memory You want to reduce the time your training loop is waiting for the next batch of data How do you use it? Install like any other Julia package using the package manager (see  setup ): ] add  DataLoaders After installation, import it, create a  DataLoader  from a dataset and batch size, and iterate over it: using  DataLoaders\n# 10.000 observations of inputs with 128 features and one target feature\n data  =  ( rand ( 128 ,  10000 ) ,  rand ( 1 ,  10000 ) )\n dataloader  =  DataLoader ( data ,  16 )\n\n for  ( xs ,  ys )  in  dataloader\n     @assert   size ( xs )  ==  ( 128 ,  16 )\n     @assert   size ( ys )  ==  ( 1 ,  16 )\n end Next, you may want to read What datasets you can use it with How it compares to PyTorch ’ s data loader"
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.ObsDimension",
        "title": "ObsDimension",
        "text": " see  ?ObsDim"
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.value_grad",
        "title": "value_grad",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.gettargets",
        "title": "gettargets",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.obs_dim",
        "title": "obs_dim",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.ObsDim",
        "title": "ObsDim",
        "text": ""
    },
    {
        "doctype": "document",
        "id": "documents/docs/interface.md",
        "title": "Data container interface",
        "text": " Data container interface"
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.randtype",
        "title": "randtype",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.ismarginbased",
        "title": "ismarginbased",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.DataIterator",
        "title": "DataIterator",
        "text": " abstract  DataIterator { TElem , TData } Baseclass for all types that iterate over a  data  source in some manner .  The total number of observations may or may not be known or defined and in general there is no contract that getobs  or  nobs  has to be supported by the type of  data . Furthermore,  length  should be used to query how many elements the iterator can provide, while  nobs  may return the underlying true amount of observations available (if known) . see  MLDataPattern.RandomObs ,  MLDataPattern.RandomBatches"
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.value!",
        "title": "value!",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.DataLoader",
        "title": "DataLoader",
        "text": " DataLoader (\n     data ,\n     batchsize  =  1;\n     partial  =  true ,\n     collate  =  true ,\n     buffered  =  collate ,\n     parallel  =  Threads . nthreads ( )  >  1 ,\n     useprimary  =  false ,\n ) Create an efficient iterator of batches over  data container   data . Arguments Positional data : A data container supporting the  LearnBase  data access pattern batchsize = 1 : Number of samples to batch together .  Disable batching by setting to  nothing . Keyword partial::Bool = true : Whether to include the last batch when  nobs(dataset)  is not divisible by  batchsize .   true  ensures all batches have the same size, but some samples might be dropped . buffered::Bool = collate : If  buffered  is  true , loads data inplace using  getobs! .  See  Data containers  for details on buffered loading . parallel::Bool = Threads.nthreads() > 1) : Whether to load data in parallel, keeping the primary thread is .  Default is  true  if more than one thread is available . useprimary::Bool = false : If  false , keep the main thread free when loading data in parallel .  Is ignored if  parallel  is  false . Examples DataLoader(data, 16) ===  BufferGetObsParallel ( batchviewcollated (data, 16))"
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.deriv!",
        "title": "deriv!",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.TupleSet",
        "title": "TupleSet",
        "text": " Groups several heterogenous sets .  Used mainly for proper dispatch ."
    },
    {
        "doctype": "document",
        "id": "documents/toc.md",
        "title": "toc",
        "text": " Guide Introduction Motivation A simple example Data containers Shuffling, subsetting, sampling QuickStart for PyTorch users Project status Library Overview Docstrings"
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.AbstractBatchView",
        "title": "AbstractBatchView",
        "text": " abstract  AbstractBatchView { TElem ,  TData }  <:  DataView { TElem ,  TData } Baseclass for all vector - like views of some data structure, that views it as some form or vector of equally sized batches . see  MLDataPattern.BatchView  for a concrete example ."
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.learn",
        "title": "learn",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.RingBuffer",
        "title": "RingBuffer",
        "text": " RingBuffer ( size ,  buf ) A  Channel - like data structure that rotates through size  buffers .   put! s work by mutating one of the buffers: put! ( ringbuffer )  do  buf\n     rand! ( buf )\n end The result can then be  take! n: res  =  take! ( ringbuffer ) Invalidation Only one result is valid at a time !  On the next  take! , the previous result will be reused as a buffer and be mutated by a  put!"
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.@pack_BatchViewCollated",
        "title": "@pack_BatchViewCollated",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.BatchViewCollated",
        "title": "BatchViewCollated",
        "text": " BatchViewCollated ( data ,  size;  droplast  =  false ) A batch view of container  data  with collated batches of size  size ."
    },
    {
        "doctype": "documentation",
        "id": "references/DataLoaders.BufferGetObsParallel",
        "title": "BufferGetObsParallel",
        "text": " BufferGetObsParallel ( data;  useprimary  =  false ) Like  MLDataPattern.BufferGetObs  but preloads observations into a buffer ring with multi - threaded workers ."
    },
    {
        "doctype": "document",
        "id": "documents/docs/setup.md",
        "title": "Installation",
        "text": " Installation Julia DataLoaders . jl is a package for the  Julia Programming Language .  To use the package you need to install Julia, which you can download  here . DataLoaders . jl Julia has a built - in package manager which is used to install packages .  Running the installed  julia  command launches an interactive session .  To install DataLoaders . jl, run the following command: using  Pkg;  Pkg . add ( \"DataLoaders\" ) Enabling multi - threading To make use of multi - threaded data loading, you need to start Julia with multiple threads .  If starting the  julia  executable yourself, you can pass a  -t <nthreads>  argument or set the environment variable  JULIA_NUM_THREADS  beforehand .  To check that you have multiple threads available to you, run: julia >  Threads . nthreads ( )\n 12 If you ’ re running Julia in a Jupyter notebook, see  IJulia . jl ’ s documentation ."
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.grad!",
        "title": "grad!",
        "text": " Do a backward pass, updating the gradients of learnable parameters and/or inputs"
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.value_grad!",
        "title": "value_grad!",
        "text": ""
    },
    {
        "doctype": "documentation",
        "id": "references/LearnBase.gettarget",
        "title": "gettarget",
        "text": ""
    }
]

